import { db } from "./SQLite";


export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS PostIT (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);",
      [],
      () => {
        // Insere registro padrão após a criação da tabela
        // db.transaction((transaction) => {
        //   transaction.executeSql(
        //     "INSERT INTO PostIT (titulo, categoria, texto) VALUES (?, ?, ?)",
        //     ["", "", ""],
        //     () => {
        //       console.log("Registro padrão inserido com sucesso");
        //     }
        //   );
        // });
      }
    );
  });
}



export async function adicionaNota(nota) {
  if(!nota.hasOwnProperty('categoria'))
   throw new Error('A nota deve conter uma categoria')
  if(!nota.hasOwnProperty('titulo'))
    throw new Error('A nota deve conter um título')
  if(!nota.hasOwnProperty('texto'))
    throw new Error('A nota deve conter um texto')
  return new Promise((resolve, reject) => {
  db.transaction((transaction) => {
  transaction.executeSql(
  "INSERT INTO PostIT(titulo, categoria, texto) VALUES (?, ?, ?);",
  [nota.titulo, nota.categoria, nota.texto],
  () => {
  resolve("nota adicionada com sucesso");
  },
  (transaction, error) => {
  reject(error);
  }
  );
  });
  }).catch(error => console.error(error));
  }

// export async function adicionaNota(nota) {
//   return new Promise((resolve) => {
//     db.transaction((transaction) => {
//       transaction.executeSql(
//         "INSERT INTO Notas(titulo, categoria, texto) VALUES (?, ?, ?);",
//         [nota.titulo, nota.categoria, nota.texto],
//         () => {
//           resolve("nota adicionada com sucesso");
//         }
//       );
//     });
//   });
// }

export async function buscaNotas() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM PostIT;",
        [],
        (transaction, resultado) => {
          resolve(resultado.rows._array);
        }
      );
    });
  });
}


export async function atualizaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE PostIT SET titulo = ?, categoria = ?, texto = ?  WHERE id=?;",
        [nota.titulo, nota.categoria, nota.texto, nota.id],
        () => {
          resolve("Nota atualizada com sucesso!");
        }
      );
      });
  });
}

export function verificaTabela() {
  db.transaction((transaction) => {
    try {
      transaction.executeSql("SELECT * FROM PostIT;", [], () => {
        console.log("Tabela Notas existe!");
      });
    } catch (error) {
      console.log("Tabela Notas não existe!");
    }
  });
}

export function mostraConteudoTabela() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "SELECT * FROM PostIT;",
      [],
      (transaction, resultado) => {
        console.log(resultado.rows._array);
      }
    );
  });
}

export function apagaTabela(nomeTabela) {
  db.transaction((transaction) => {
  transaction.executeSql(`DROP TABLE ${nomeTabela}`);
  });
  }