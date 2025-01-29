export const formatNumber = (digit: number) => {
    return new Intl.NumberFormat('pt-Pt').format(digit)
}