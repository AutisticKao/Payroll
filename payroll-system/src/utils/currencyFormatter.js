export function formatCurrency(value) {
    if (isNaN(value)) {
        return '';
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(value);
}