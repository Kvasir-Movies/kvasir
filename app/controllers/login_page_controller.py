class LoginPageController():
    def handle(self):
          return '''<form method="POST">
                  Email: <input type="text" name="email"><br>
                  Password: <input type="password" name="password"><br>
                  <input type="submit" value="Submit"><br>
              </form>'''