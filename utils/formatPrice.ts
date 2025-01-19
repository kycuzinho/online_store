export const formatPrice = (amout: number) =>{
    return new Intl.NumberFormat('pt-pt',{
        style: 'currency',
        currency:'EUR'
    }).format(amout)
};