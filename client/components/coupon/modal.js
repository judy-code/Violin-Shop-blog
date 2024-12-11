import React from 'react';
import styles from './modal.module.scss';

const Modal = ({ coupon, onClose }) => {
    if (!coupon) return null;

    // 格式化折扣
    const formatDiscount = (type, value) => {
        if (type === 1) {
            return `${value}元`
        } else if (type === 2) {
            const formattedValue = value.toString().replace(/0/g, '')
            return `${formattedValue}折`
        } else {
            return '未知折扣類型'
        }
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <div className={styles.couponDetail}>
                    <div className='d-flex'>
                        <div className={styles.couponLeft}>
                            <h6 className={`h4Bold fontDarkBrown ${styles['coupon-title']}`}>{coupon.name}</h6>
                            <p className={`h6Bold fontDarkBrown ${styles['coupon-info']}`}>{coupon.info}</p>
                            <p className={`web-16px-B ${styles['exp-date']}`}>{`有效期限：${coupon.end_date}`}</p>
                        </div>
                        <div className={styles.couponRight}>
                            <div className={` fontDarkBrown ${styles['discount']}`}>{formatDiscount(coupon.type, coupon.value)}</div>
                            <div className={`web-16px-B ${styles['discount-code']}`}>優惠碼</div>
                            <div className={`h6Bold ${styles['code']}`}>{coupon.sid}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;