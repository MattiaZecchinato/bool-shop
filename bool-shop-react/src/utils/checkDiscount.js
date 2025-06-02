function checkDiscount(item) {

    const { discount_start, discount_end } = item

    const currentDate = new Date()

    if (discount_start && discount_end) {

        const discountDateStart = new Date(discount_start)
        const discountDateEnd = new Date(discount_end)

        if (currentDate >= discountDateStart && currentDate <= discountDateEnd) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}

export default checkDiscount