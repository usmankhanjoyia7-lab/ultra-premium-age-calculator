document.addEventListener('DOMContentLoaded', () => {
    const startDay = document.getElementById('start-day');
    const startMonth = document.getElementById('start-month');
    const startYear = document.getElementById('start-year');
    
    const endDay = document.getElementById('end-day');
    const endMonth = document.getElementById('end-month');
    const endYear = document.getElementById('end-year');
    
    const calculateBtn = document.getElementById('calculate-btn');
    const resultSection = document.getElementById('result-section');
    const errorMsg = document.getElementById('error-msg');
    
    const resYears = document.getElementById('res-years');
    const resMonths = document.getElementById('res-months');
    const resDays = document.getElementById('res-days');

    // Populate dropdowns
    const populateDropdowns = () => {
        // Days 1-31
        for (let i = 1; i <= 31; i++) {
            const option1 = new Option(i, i);
            const option2 = new Option(i, i);
            startDay.add(option1);
            endDay.add(option2);
        }

        // Years 1970-2027
        for (let i = 2027; i >= 1970; i--) {
            const option1 = new Option(i, i);
            const option2 = new Option(i, i);
            startYear.add(option1);
            endYear.add(option2);
        }
    };

    populateDropdowns();

    // Core Calculation Logic
    const calculateAge = (startDate, endDate) => {
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
        let days = endDate.getDate() - startDate.getDate();

        if (days < 0) {
            months--;
            // Get last day of previous month
            const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    };

    // Animation for numbers
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    calculateBtn.addEventListener('click', () => {
        // Validation
        const sD = parseInt(startDay.value);
        const sM = parseInt(startMonth.value);
        const sY = parseInt(startYear.value);
        
        const eD = parseInt(endDay.value);
        const eM = parseInt(endMonth.value);
        const eY = parseInt(endYear.value);

        if (isNaN(sD) || isNaN(sM) || isNaN(sY) || isNaN(eD) || isNaN(eM) || isNaN(eY)) {
            errorMsg.innerText = "Please select all date fields.";
            resultSection.classList.add('hidden');
            return;
        }

        const startDate = new Date(sY, sM, sD);
        const endDate = new Date(eY, eM, eD);

        // Date validity check (e.g., Feb 31st)
        if (startDate.getMonth() !== sM || endDate.getMonth() !== eM) {
            errorMsg.innerText = "Invalid date selection. Please check the number of days in the month.";
            resultSection.classList.add('hidden');
            return;
        }

        if (endDate < startDate) {
            errorMsg.innerText = "End date cannot be before start date.";
            resultSection.classList.add('hidden');
            return;
        }

        // Success
        errorMsg.innerText = "";
        const result = calculateAge(startDate, endDate);
        
        resultSection.classList.remove('hidden');
        resultSection.style.display = 'block';
        
        // Trigger animations
        animateValue(resYears, 0, result.years, 800);
        animateValue(resMonths, 0, result.months, 800);
        animateValue(resDays, 0, result.days, 800);
    });
});
