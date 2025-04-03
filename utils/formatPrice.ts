export const formatPrice = (amount: number) =>{
    return new Intl.NumberFormat('pt-pt',{
        style: 'currency',
        currency:'EUR'
    }).format(amount)
};