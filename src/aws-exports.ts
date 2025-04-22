const awsConfig = {
    Auth: {
      Cognito: {
        userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
        userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      }
    }
  };
  
  export default awsConfig;
  