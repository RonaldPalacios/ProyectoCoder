
const template = {

welcome : userData => {
    const { first_name, last_name, phone, email } = userData;
    return `
      <h1>Nuevo usuario registrado</h1>
      </br>
      <table>
         <tbody>
          <tr>
            <td>Nombre:</td>
            <td>${first_name}</td>
          </tr>
          
          <tr>
            <td>Apellido:</td>
            <td>${last_name}</td>
          </tr>
          <tr>
            <td>Teléfono:</td>
            <td>${phone}</td>
          </tr>
          <tr>
          <td>Email:</td>
          <td>${email}</td>
        </tr>
        </tbody>
    </table>`;
},
/*purchase: userData =>{
  const { username, name, age, address, phone, avatar } = userData;
    return `
  <h1>Nuevo usuario registrado</h1>
      </br>
      <table>
         <tbody>
          <tr>
            <td>Usuario:</td>
            <td>${username}</td>
          </tr>
          <tr>
            <td>Nombre:</td>
            <td>${name}</td>
          </tr>
          <tr>
            <td>Edad:</td>
            <td>${age}</td>
          </tr>
          <tr>
            <td>Dirección:</td>
            <td>${address}</td>
          </tr>
          <tr>
            <td>Teléfono:</td>
            <td>${phone}</td>
          </tr>
          <tr>
            <td>Avatar:</td>
            <td>${avatar}</td>
          </tr>
        </tbody>
    </table>`;
}*/
}

export default template;