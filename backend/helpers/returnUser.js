'use strict'


/*________________________________________________________
 * 
 *  ----------------Retornar Usuario ---------------------
 * _______________________________________________________
 */

const returnUser = (user) => {
   return {
    _id: user._id,
    name: user.name,
    surname: user.surname,
    country: user.country,
    email: user.email,
    profile: user.profile,
    telephone: user.telephone,
    gender: user.gender,
    birthday: user.birthday,
    dni: user.dni
   }
};

module.exports = {
    returnUser
}