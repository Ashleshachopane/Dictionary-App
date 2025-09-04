document.getElementById("calcBtn").addEventListener("click", calculateAge);

function calculateAge() {
    const dob = document.getElementById("dob").value;
    if (!dob) {
        alert("Please select your date of birth!");
        return;
    }

    const birthDate = new Date(dob);

    setInterval(() => {
        const now = new Date();
        const diff = now - birthDate;

        // Years, Months, Days
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            days += prevMonthDays;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Live time
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        // Next Birthday Countdown (live)
        let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (now > nextBirthday) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }
        const countdownDiff = nextBirthday - now;

        const cdDays = Math.floor(countdownDiff / (1000 * 60 * 60 * 24));
        const cdHours = Math.floor((countdownDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const cdMinutes = Math.floor((countdownDiff % (1000 * 60 * 60)) / (1000 * 60));
        const cdSeconds = Math.floor((countdownDiff % (1000 * 60)) / 1000);

        // Zodiac
        const zodiac = getZodiac(birthDate.getDate(), birthDate.getMonth() + 1);

        // Day Born
        const dayBorn = birthDate.toLocaleDateString('en-US', { weekday: 'long' });

        document.getElementById("output").style.display = "block";
        document.getElementById("output").innerHTML = `
            <p><strong>Age:</strong> ${years} years, ${months} months, ${days} days</p>
            <p><strong>Live Age:</strong> ${hours} hours, ${minutes} minutes, ${seconds} seconds old</p>
            <p><strong>Next Birthday In:</strong> ${cdDays} days, ${cdHours} hours, ${cdMinutes} minutes, ${cdSeconds} seconds 🎉</p>
            <p><strong>Zodiac Sign:</strong> ${zodiac}</p>
            <p><strong>Born On:</strong> ${dayBorn}</p>
        `;
    }, 1000);
}

function getZodiac(day, month) {
    const signs = [
        "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
        "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
    ];
    const dates = [20, 19, 20, 20, 21, 21, 22, 22, 22, 23, 23, 21];
    return day > dates[month - 1] ? signs[month % 12] : signs[(month - 1)];
}
