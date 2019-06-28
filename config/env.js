const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://root:Ebenezer123@clusterapi-gseal.mongodb.net/test?retryWrites=true&w=majority',
                jwt_password: 'dermo2019',
                jwt_expires: '7d'
            }

        case 'hml':
            return {
                bd_string: 'mongodb+srv://root:Ebenezer123@clusterapi-gseal.mongodb.net/test?retryWrites=true&w=majority',
                jwt_password: 'dermo2019',
                jwt_expires: '7d'
            }

        case 'prod':
            return {
                bd_string: 'mongodb+srv://root:Ebenezer123@clusterapi-gseal.mongodb.net/test?retryWrites=true&w=majority',
                jwt_password: 'dermo2019',
                jwt_expires: '7d'
            }
    }
}

console.log('Iniciando a API em ambiente ${env.toUpperCase())}');
module.exports = config();