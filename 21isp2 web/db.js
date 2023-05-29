const db = openDatabase("hfdghgfd", "1.0", "Test DB", 2 * 1024 * 1024)

const nameInput = document.querySelector(`input[name="name"]`)
const emailInput = document.querySelector(`input[name="email"]`)
const passwordInput = document.querySelector(`input[name="password"]`)

const authButton = document.querySelector(`input[name="auth"]`)
const regButton = document.querySelector(`input[name="reg"]`)

try {
  db.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS USERS (id unique, name, email)")
  })
} catch {
  console.log("Ошибка!")
}

regButton.addEventListener("click", () => {
  db.transaction(function (tx) {
    tx.executeSql("INSERT INTO USERS (id, name, email) VALUES (?,?,?)", [
      Date.now(),
      nameInput.value,
      emailInput.value,
    ])
    alert("Пользователь добавлен!")
  })
})

authButton.addEventListener("click", () => {
  db.transaction(function (tx) {
    tx.executeSql("SELECT * FROM USERS", [], function (tx, results) {
      for (let i = 0; i < results.rows.length; i++) {
        if (
          (nameInput.value == results.rows[i].name) &
          (emailInput.value == results.rows[i].email)
        ) {
          console.log("Пользователь авторизован!")
        } else {
          console.log("Неверные данные!")
        }
      }
    })
  })
})
console.log('hi')