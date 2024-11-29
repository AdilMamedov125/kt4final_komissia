document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('cardForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const bank = document.getElementById('bank').value;
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardName = document.getElementById('cardName').value.trim();
        const expiryDate = document.getElementById('expiryDate').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (/[^0-9\s]/.test(cardNumber)) {
            alert('Номер карты должен содержать только цифры и пробелы!');
            return;
        }

        if (/[^0-9]/.test(cvv)) {
            alert('CVV должен содержать только цифры!');
            return;
        }

        if (!bank) {
            alert('Пожалуйста, выберите банк.');
            return;
        }

        const cardNumberRegex = /^[\d\s]{16,19}$/;
        if (!cardNumberRegex.test(cardNumber)) {
            alert('Номер карты должен содержать только цифры и пробелы (16-19 символов).');
            return;
        }

        const expiryDateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/;
        if (!expiryDateRegex.test(expiryDate)) {
            alert('Срок действия должен быть в формате DD/MM (день не больше 31, месяц не больше 12).');
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert('CVV должен содержать ровно 3 цифры.');
            return;
        }

        alert(`Информация карты:
    Банк: ${bank}
    Номер: ${cardNumber}
    Имя: ${cardName}
    Срок действия: ${expiryDate}
    CVV: ${cvv}`);
    });

    document.getElementById('cardNumber').addEventListener('input', (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9\s]/g, '');
        e.target.value = value;
    });

    document.getElementById('cvv').addEventListener('input', (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, '');
        e.target.value = value;
    });

    document.getElementById('expiryDate').addEventListener('input', (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9\/]/g, '');
        let parts = value.split('/');
        if (parts[0] && parts[0] > 31) {
            parts[0] = '31';
        }
        if (parts[1] && parts[1] > 12) {
            parts[1] = '12';
        }
        e.target.value = parts.join('/');
    });
});
