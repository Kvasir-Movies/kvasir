import hashlib

salt = 'valyria'

def hash_password(password):
    salted_pw = password + salt
    password_hash = hashlib.sha256(bytes(salted_pw, encoding='utf-8')).hexdigest() # 64 bytes
    return password_hash
