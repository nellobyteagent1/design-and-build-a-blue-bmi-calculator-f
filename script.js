let currentUnit = 'metric';

function setUnit(unit) {
    currentUnit = unit;
    const metricBtn = document.getElementById('metricBtn');
    const imperialBtn = document.getElementById('imperialBtn');
    const heightLabel = document.getElementById('heightLabel');
    const weightLabel = document.getElementById('weightLabel');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');

    if (unit === 'metric') {
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
        heightLabel.textContent = 'Height (cm)';
        weightLabel.textContent = 'Weight (kg)';
        heightInput.placeholder = 'e.g. 175';
        weightInput.placeholder = 'e.g. 70';
    } else {
        imperialBtn.classList.add('active');
        metricBtn.classList.remove('active');
        heightLabel.textContent = 'Height (inches)';
        weightLabel.textContent = 'Weight (lbs)';
        heightInput.placeholder = 'e.g. 69';
        weightInput.placeholder = 'e.g. 154';
    }

    heightInput.value = '';
    weightInput.value = '';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('error').textContent = '';
}

function calculateBMI() {
    const heightVal = parseFloat(document.getElementById('height').value);
    const weightVal = parseFloat(document.getElementById('weight').value);
    const errorEl = document.getElementById('error');
    const resultEl = document.getElementById('result');

    errorEl.textContent = '';
    resultEl.classList.add('hidden');

    if (!heightVal || !weightVal || heightVal <= 0 || weightVal <= 0) {
        errorEl.textContent = 'Please enter valid height and weight values.';
        return;
    }

    if (currentUnit === 'metric' && (heightVal < 50 || heightVal > 300)) {
        errorEl.textContent = 'Height should be between 50 and 300 cm.';
        return;
    }
    if (currentUnit === 'imperial' && (heightVal < 20 || heightVal > 120)) {
        errorEl.textContent = 'Height should be between 20 and 120 inches.';
        return;
    }

    let bmi;
    if (currentUnit === 'metric') {
        const heightM = heightVal / 100;
        bmi = weightVal / (heightM * heightM);
    } else {
        bmi = (weightVal / (heightVal * heightVal)) * 703;
    }

    bmi = Math.round(bmi * 10) / 10;

    let category, categoryClass;
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'category-underweight';
    } else if (bmi < 25) {
        category = 'Normal';
        categoryClass = 'category-normal';
    } else if (bmi < 30) {
        category = 'Overweight';
        categoryClass = 'category-overweight';
    } else {
        category = 'Obese';
        categoryClass = 'category-obese';
    }

    document.getElementById('bmiValue').textContent = bmi;

    const catEl = document.getElementById('bmiCategory');
    catEl.textContent = category;
    catEl.className = 'bmi-category ' + categoryClass;

    // Position indicator on bar (BMI 15-40 range mapped to 0-100%)
    const pct = Math.max(0, Math.min(100, ((bmi - 15) / 25) * 100));
    document.getElementById('bmiIndicator').style.left = pct + '%';

    resultEl.classList.remove('hidden');
}
