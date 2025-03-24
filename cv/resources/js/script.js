function calculateAge(birthDate) {
    const now = new Date();
    const birthday = new Date(birthDate);
    let age = now.getFullYear() - birthday.getFullYear();
    const month = now.getMonth() - birthday.getMonth();

    if (month < 0 || (month === 0 && now.getDate() < birthday.getDate())) {
        age--;
    }
    return age;
}

const birthDate = '2002-03-25';
const age = calculateAge(birthDate);

const ageSpan = document.getElementById('age');
ageSpan.innerText = `${age} años`;

const day = new Date().getDate();
const month = new Date().toLocaleDateString('es-ES', { month: 'long' });
const year = new Date().getFullYear();

document.getElementById('day').innerHTML = ` ${day} `;
document.getElementById('month').innerHTML = ` ${month} `;
document.getElementById('year').innerHTML = ` ${year}`;