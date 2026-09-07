(function(){
  var ABILITIES = {
    1: {
      title: 'מודעות על והתנסות מהירה',
      video: 'assets/video-01.mp4',
      desc: 'התפקיד המנהיגותי הוא לראות את מה שאחרים עדיין לא רואים, ולסנן את הרעש תוך מיקוד ובהירות, על מנת לאפשר לצוות להעז להתנסות, ללמוד במהירות, ולחלץ את הערך האמיתי הטמון בהזדמנויות ה‑AI.'
    },
    2: {
      title: 'ניהול צוותים ותהליכים משולבים',
      video: 'assets/video-02.mp4',
      desc: 'התפקיד המנהיגותי הוא להפוך לאדריכל של צוות מסוג חדש, השוזר יחד את הכישרון האנושי ואת עוצמת ה‑AI לכדי תהליך עבודה אחד, שבו כל צד עושה את מה שהוא עושה הכי טוב.'
    },
    3: {
      title: 'ניווט פרדוקס האדם–מכונה',
      video: 'assets/video-03.mp4',
      desc: 'התפקיד המנהיגותי הוא להחזיק את שני קצות המתח — מהירות ואיכות, אימוץ וזהירות — מבלי להתפשר, תוך התאמת הכיוון כאשר המציאות משתנה.'
    },
    4: {
      title: 'חשיבה אתית וביקורתית',
      video: 'assets/video-04.mp4',
      desc: 'התפקיד המנהיגותי הוא להוביל את הדרך בהטמעה אחראית של AI, מתוך חיבור למצפן הפנימי, על מנת לוודא שהן האנשים והן הסטנדרטים המקצועיים לא נפגעים.'
    },
    5: {
      title: 'מיקוד באנשים',
      video: 'assets/video-05.mp4',
      desc: 'התפקיד המנהיגותי הוא לשמור על האנשים במרכז בתוך טרנספורמצית ה‑AI, לטפח את המשמעות, האמפתיה והמיומנויות שהמכונה אינה יכולה להחליף, ולהגן על היכולות האנושיות שהשימוש ב‑AI עלול לשחוק.'
    }
  };

  var overlay = document.getElementById('modal-overlay');
  var modalCard = overlay.querySelector('.modal-card');
  var titleEl = document.getElementById('modal-title');
  var numberEl = document.getElementById('modal-number');
  var descEl = document.getElementById('modal-desc');
  var videoEl = document.getElementById('modal-video-el');
  var videoSource = videoEl.querySelector('source');
  var lastFocused = null;

  function openModal(index){
    var data = ABILITIES[index];
    if (!data) return;
    titleEl.textContent = data.title;
    numberEl.textContent = index;
    descEl.textContent = data.desc;
    videoSource.src = data.video;
    videoEl.load();

    lastFocused = document.activeElement;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-close').focus();
  }

  function closeModal(){
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    videoEl.pause();
    videoSource.src = '';
    videoEl.removeAttribute('src');
    videoEl.load();
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.ability-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      openModal(btn.getAttribute('data-index'));
    });
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);

  overlay.addEventListener('click', function(e){
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });

  /* ---------- reveal-on-scroll / reveal-on-load ---------- */

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }
})();
