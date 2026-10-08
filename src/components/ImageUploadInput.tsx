import * as React from "react";
import { Upload, Image as ImageIcon, X, Check, Loader2, Link as LinkIcon, RefreshCw } from "lucide-react";
import { uploadAdminMedia } from "@/lib/api/admin.data.functions";

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: "banners" | "articles" | "team" | "projects" | "general";
  recommendation?: string;
  required?: boolean;
}

export function ImageUploadInput({
  label,
  value,
  onChange,
  folder = "general",
  recommendation,
  required = false,
}: ImageUploadInputProps) {
  const [uploading, setUploading] = React.useState(false);
  const [dragActive, setDragActive] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showManualUrl, setShowManualUrl] = React.useState(false);
  const [successNotice, setSuccessNotice] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileProcess = async (file: File) => {
    if (!file) return;

    // Vérification type image
    if (!file.type.startsWith("image/")) {
      setError("Le fichier sélectionné n'est pas une image valide (JPEG, PNG, WebP, SVG, GIF acceptés).");
      return;
    }

    // Vérification taille (10 Mo)
    if (file.size > 10 * 1024 * 1024) {
      setError("L'image est trop volumineuse (maximum 10 Mo autorisés).");
      return;
    }

    const token = localStorage.getItem("dt_admin_token");
    if (!token) {
      setError("Session expirée. Veuillez vous reconnecter.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Lecture en Base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Erreur de lecture du fichier"));
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      // Appel de la fonction serveur
      const res = await uploadAdminMedia({
        data: {
          token,
          fileName: file.name,
          fileType: file.type,
          base64Data,
          folder,
        },
      });

      if (res.success && res.url) {
        onChange(res.url);
        setSuccessNotice(true);
        setTimeout(() => setSuccessNotice(false), 3000);
      } else {
        setError("Une erreur est survenue lors du téléversement.");
      }
    } catch (err: any) {
      setError(err?.message || "Échec du téléversement de l'image.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    // Réinitialiser la valeur de l'input pour permettre de ré-uploader le même fichier
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--admin-text-subtle)" }}>
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          className="text-[11px] font-medium transition cursor-pointer hover:underline flex items-center gap-1"
          style={{ color: "var(--orange)" }}
        >
          <LinkIcon className="h-3 w-3" />
          {showManualUrl ? "Utiliser l'upload de fichier" : "Coller une URL externe"}
        </button>
      </div>

      {/* Mode saisie manuelle d'URL */}
      {showManualUrl ? (
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... ou /assets/..."
            className="w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm outline-none transition"
            style={{
              backgroundColor: "var(--admin-input)",
              borderColor: "var(--admin-border)",
              color: "var(--admin-text)",
            }}
          />
          {recommendation && (
            <p className="text-[10px] mt-1" style={{ color: "var(--admin-text-subtle)" }}>
              {recommendation}
            </p>
          )}
        </div>
      ) : (
        /* Mode Upload avec Drag & Drop + Aperçu */
        <div className="space-y-3">
          {/* Si une image est déjà sélectionnée */}
          {value ? (
            <div
              className="relative group rounded-xl border p-3 flex items-center gap-3 transition"
              style={{
                backgroundColor: "var(--admin-card-subtle)",
                borderColor: "var(--admin-border)",
              }}
            >
              <div className="h-16 w-24 shrink-0 rounded-lg overflow-hidden border bg-black/10 flex items-center justify-center" style={{ borderColor: "var(--admin-border)" }}>
                <img
                  src={value}
                  alt="Aperçu"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 pr-8">
                <p className="text-xs font-semibold truncate" style={{ color: "var(--admin-text)" }}>
                  Image active
                </p>
                <p className="text-[11px] truncate mt-0.5 select-all font-mono" style={{ color: "var(--admin-text-subtle)" }}>
                  {value}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="text-[11px] font-medium flex items-center gap-1 cursor-pointer transition hover:opacity-80"
                    style={{ color: "var(--orange)" }}
                  >
                    <RefreshCw className="h-3 w-3" />
                    Remplacer l'image
                  </button>
                </div>
              </div>

              {/* Bouton supprimer */}
              <button
                type="button"
                onClick={() => onChange("")}
                title="Supprimer cette image"
                className="absolute top-3 right-3 p-1.5 rounded-lg border transition cursor-pointer hover:opacity-80"
                style={{
                  backgroundColor: "rgba(239,68,68,0.1)",
                  borderColor: "rgba(239,68,68,0.25)",
                  color: "#ef4444",
                }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            /* Zone de téléversement (Dropzone) */
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                dragActive ? "border-accent bg-accent/10 scale-[1.01]" : "hover:border-accent/60"
              }`}
              style={{
                borderColor: dragActive ? "var(--orange)" : "var(--admin-border)",
                backgroundColor: dragActive ? "rgba(242,106,33,0.06)" : "var(--admin-card-subtle)",
              }}
            >
              {uploading ? (
                <div className="py-2 flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--orange)" }} />
                  <p className="text-xs font-semibold" style={{ color: "var(--admin-text)" }}>
                    Téléversement en cours...
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--admin-text-subtle)" }}>
                    Veuillez patienter pendant l'optimisation et l'enregistrement
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: "rgba(242,106,33,0.12)", color: "var(--orange)" }}
                  >
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--admin-text)" }}>
                      Glissez une image ici ou <span style={{ color: "var(--orange)" }}>parcourez vos fichiers</span>
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "var(--admin-text-subtle)" }}>
                      PNG, JPG, WebP, SVG ou GIF jusqu'à 10 Mo
                    </p>
                  </div>
                  {recommendation && (
                    <p className="text-[10px] font-medium mt-1 px-2.5 py-0.5 rounded-full border" style={{ borderColor: "var(--admin-border)", color: "var(--admin-text-subtle)" }}>
                      {recommendation}
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Input file caché */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Message de succès */}
      {successNotice && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "#10b981" }}>
          <Check className="h-3.5 w-3.5" />
          <span>Image téléversée avec succès !</span>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="flex items-center gap-1.5 text-[11px] rounded-lg p-2 border" style={{ backgroundColor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.25)", color: "#ef4444" }}>
          <X className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
