import sequelize from "./config/database.js"; 


//try(tentar)-catch(pegar)-finally(finalizar)

/* comandos usados
1.arrow function;
2.try/catch;
3.async/await
4.imports type:module
5.node server.js --> rodar o banco
*/

(async() => {
   try {
        await sequelize.authenticate();
console.log('deu bom porra')
    }catch(error){
        console.log('erro na conexão do banco, seu limitado!!', error)
    } finally{
await sequelize.close()
    }
})();