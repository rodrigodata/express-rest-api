/* Importação de Dependencias */
const CryptoJS = require("crypto-js");
const Crypto = require("crypto");

/* Importação de constants */
const AppConstants = require("../constants/app");

module.exports = exports = function(Schema) {
  /* */
  Schema.methods.verificarSenha = function(senha) {
    let hash = Crypto.pbkdf2Sync(
      senha,
      this.salt,
      10000,
      512,
      "sha512"
    ).toString("hex");
    return this.hash === hash;
  };

  /**
   * Método responsável por criar o Salt e a Hash de senha.
   * Usamos o Salt para gerar a hash, juntamente com a senha gerada e outras configurações.
   */
  Schema.methods.geradorSaltHash = function(senha) {
    /* Ver mais detalhes em https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback */
    this.salt = Crypto.randomBytes(16).toString("hex");
    this.hash = Crypto.pbkdf2Sync(
      senha,
      this.salt,
      10000,
      512,
      "sha512"
    ).toString("hex");
  };

  /* Método responsável em gerar senha aleatóriamente. */
  Schema.methods.geradorSenha = function(senhaTamanhoCustomizado) {
    const senhaGerada = Array(
      senhaTamanhoCustomizado || AppConstants.SENHA_TAMANHO
    )
      .fill(AppConstants.DICIONARIO)
      .map(function(x) {
        return x[Math.floor(Math.random() * x.length)];
      })
      .join("");
    this.criptografarSenha(senhaGerada);
  };

  /* Método responsável por criptografar senha gerada pelo método geradorSenha. */
  Schema.methods.criptografarSenha = function(senhaGerada) {
    this.senha = CryptoJS.AES.encrypt(senhaGerada, AppConstants.SECRET_API);
  };

  /* Método responsável por descriptograr senha e que torna possível visualiza-la novamente. */
  Schema.methods.descriptografarSenha = function() {
    const bytes = CryptoJS.AES.decrypt(this.senha, AppConstants.SECRET_API);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
};
