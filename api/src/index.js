import app from './app';
import db from '../src/database/models/index';

async function main() {
  try {
    db.sequelize.authenticate().then(() => {
      console.log('Conectado')
    })
  } catch (error) {
    console.error('No conectado')
  }  
  app.listen(4001);
  console.log("Server on port 4001");
}

main();

