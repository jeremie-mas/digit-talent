import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.log("Usage: node scripts/hash-password.mjs <votre_mot_de_passe>");
  process.exit(1);
}

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log("\n=======================================================");
console.log("Mot de passe en clair :", password);
console.log("Hash bcrypt généré    :", hash);
console.log("=======================================================");
console.log("\nAjoutez cette ligne dans votre fichier .env :");
console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
