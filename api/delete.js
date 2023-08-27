const Pool = require('pg').Pool
const { deleteFile } = require('./upload_img.js')
require('dotenv').config({ debug: process.env.DEBUG });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

const deleteCv = async (request, response) => {
    const id = parseInt(request.params.id);
    const select_img_destination  = await pool.query('Select img_destination from personaldata where cv_id=$1', [id]);
    const img_destination = select_img_destination.rows[0].img_destination;
    let outputMessage = '';

    try {
        const result = await pool.query('Delete from cv where cv_id = $1', [id]);
        if(img_destination){
            deleteFile(img_destination);
            outputMessage += `${img_destination} deleted\n`
        }
        outputMessage += `${id} - deleted, ${result} `;
        console.log(outputMessage);
        response.status(200).render('confirm_generation/confirm', {
                cvID: id,
                msg: 'successfully deleted',
                errorUpdate: false,
                errorDelete: false
        });
    } catch (error) {
        console.log(error);
        response.status(403).render('confirm_generation/confirm', {
            cvID: id,
            msg: 'Something gone wrong',
            errorUpdate: false,
            errorDelete: true
    });
    }
}

module.exports = {
    deleteCv
}
