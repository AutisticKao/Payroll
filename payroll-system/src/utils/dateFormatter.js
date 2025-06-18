const formatDate = (date, format = 'YYYY-MM-DD') => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
    
    if (format === 'YYYY-MM-DD') {
        const [day, month, year] = formattedDate.split('/');
        return `${year}-${month}-${day}`;
    }
    
    return formattedDate;
};

export { formatDate };