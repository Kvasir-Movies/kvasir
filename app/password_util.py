import hashlib

class PasswordUtil():
    salt = 'valyria'

    @classmethod
    def hash_password(self, password):
        salted_pw = password + PasswordUtil.salt
        password_hash = hashlib.sha256(bytes(salted_pw, encoding='utf-8')).hexdigest() # 64 bytes
        return password_hash
