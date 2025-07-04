// 1. Intersection Observer لتشغيل الأنيميشن عند دخول العناصر للشاشة (مرة واحدة فقط)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // إيقاف المراقبة بعد أول ظهور
        }
    });
});

// تطبيق المراقب على العناصر التي تبدأ مخفية أو عليها أنيميشن
document.querySelectorAll(
    '.hidden, .feat, .srv, .images, .project, .special-heading, .about-content .text, .about-content .image-container'
).forEach(element => observer.observe(element));

// 2. تأثير ظهور الـ landing عند تحميل الصفحة
window.addEventListener('load', () => {
    const landingSection = document.querySelector('.landing');
    if (landingSection) {
        landingSection.classList.add('loaded');
    }
    document.body.classList.add('loaded');
});

// 3. مراقب خاص لمشاريع البورتفوليو بحيث الأنيميشن تشتغل كلما ظهرت وتختفي عند الخروج
const projectModerns = document.querySelectorAll('.project-modern');
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
});
projectModerns.forEach(el => observer2.observe(el));

// 4. سلاسة ظهور صور Vision Tower والمشاريع عند التحميل (fade-in)
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(
        '.main-project-img, .vision-hero-img img, .vision-img img, .section-img'
    ).forEach(img => {
        img.classList.add('visible');
    });
});