/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        HOME_URL:"http://localhost:3000",
        NEXT_PUBLIC_STRIPE_KEY: 'pk_test_51NxYWaSJ9imUeDeVFepSeQhlf916L4wXEHlBYbhajwTPUfcTKST1VqIBATK0FKS5NSH2tW3PpBO3uOcJIKk8K13800140rm7W0', 
        STRIPE_PRIVATE_KEY: 'sk_test_51NxYWaSJ9imUeDeVJ9rFCW01O9u60c0uxyRrVMeC7AWjrNEgPaUxvfkfFQsPrh6oYFpnTfqolpqNQ8D5ToIKF6g900pQAUNZGU',
    },
}

module.exports = nextConfig
