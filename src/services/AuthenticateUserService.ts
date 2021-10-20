import axios from 'axios';
/**
 * Receber o codigo (string)
 * Recuperar o access_token no github
 * Recuperar infos do user no github
 * Verificar se o usuário existe no DB
 * ------ Se existir => Gera um TOKEN 
 * ------ Se não => Cria no DB e gera um TOKEN
 * Retorna o Token com as infos do user
 *  */ 

interface IAccessTokenResponse{
    access_token: string
}

class AuthenticateUserService {
    async execute(code: string){
        const url = 'https://github.com/login/oauth/access_token';

        //Recuperando TOKEN do user
        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null,{
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept" : "application/json"
            }
        });

        // Essa URL traz todas as infos do usuário
        const response = await axios.get('https://api.github.com/user');

        return response.data;
    }
}

export { AuthenticateUserService }