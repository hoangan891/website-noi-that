const formatPrice = (price) => {
    if (typeof price !== 'number') return '0 VNĐ';
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };
  
  export { formatPrice };