const companyBaseUrl = (import.meta.env.VITE_COMPANY_URL || 'https://wigra-production.vercel.app').replace(/\/$/, '');

export const getCompanyUrl = () => companyBaseUrl;

export const getCompanyAuthCallbackUrl = (token, user) => {
    const params = new URLSearchParams({
        token: token || '',
        user: JSON.stringify(user || {}),
    });

    return `${companyBaseUrl}/auth-callback?${params.toString()}`;
};
