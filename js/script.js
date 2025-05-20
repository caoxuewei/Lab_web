// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
  // 轮播图功能
  initSlider();

  // 标签页功能
  initTabs();

  // 响应式导航菜单
  initMobileNav();

  // 页面滚动时缩小导航栏
  initScrollHeader();

  // 平滑滚动到锚点
  initSmoothScroll();
});

// 初始化轮播图
function initSlider () {
  const slides = document.querySelectorAll('.slide');
  const controls = document.querySelectorAll('.control');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;
  let slideInterval;

  // 开始自动轮播
  startSlideshow();

  // 点击控制点切换轮播图
  controls.forEach((control, index) => {
    control.addEventListener('click', () => {
      if (index > currentSlide) {
        showNextSlide(index);
      } else if (index < currentSlide) {
        showPrevSlide(index);
      }
      resetInterval();
    });
  });

  // 添加左右按钮点击事件
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIndex = (currentSlide - 1 + slides.length) % slides.length;
      showPrevSlide(newIndex);
      resetInterval();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIndex = (currentSlide + 1) % slides.length;
      showNextSlide(newIndex);
      resetInterval();
    });
  }

  // 向右切换轮播图（下一张）
  function showNextSlide (index) {
    if (index === currentSlide) return;

    // 当前幻灯片向左退出
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('inactive-next');

    // 新幻灯片从右边进入
    slides[index].classList.add('active-next');

    // 等待一点时间让浏览器注册这些类
    setTimeout(() => {
      slides[index].classList.remove('active-next');
      slides[index].classList.add('active');

      // 将当前幻灯片更新为新的
      currentSlide = index;
      updateControls();

      // 一段时间后移除过渡类
      setTimeout(() => {
        slides.forEach(slide => {
          slide.classList.remove('inactive-next');
        });
      }, 800); // 与CSS中的过渡时间相匹配
    }, 50);
  }

  // 向左切换轮播图（上一张）
  function showPrevSlide (index) {
    if (index === currentSlide) return;

    // 当前幻灯片向右退出
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('inactive-prev');

    // 新幻灯片从左边进入
    slides[index].classList.add('active-prev');

    // 等待一点时间让浏览器注册这些类
    setTimeout(() => {
      slides[index].classList.remove('active-prev');
      slides[index].classList.add('active');

      // 将当前幻灯片更新为新的
      currentSlide = index;
      updateControls();

      // 一段时间后移除过渡类
      setTimeout(() => {
        slides.forEach(slide => {
          slide.classList.remove('inactive-prev');
        });
      }, 800); // 与CSS中的过渡时间相匹配
    }, 50);
  }

  // 更新控制点状态
  function updateControls () {
    controls.forEach((control, index) => {
      control.classList.toggle('active', index === currentSlide);
    });
  }

  // 切换到下一张轮播图
  function nextSlide () {
    const newIndex = (currentSlide + 1) % slides.length;
    showNextSlide(newIndex);
  }

  // 开始自动轮播
  function startSlideshow () {
    slideInterval = setInterval(nextSlide, 8000); // 延长到8秒
  }

  // 重置轮播计时器
  function resetInterval () {
    clearInterval(slideInterval);
    startSlideshow();
  }
}

// 初始化标签页
function initTabs () {
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');

      // 移除所有标签页和内容的活动状态
      document.querySelectorAll('.tab, .tab-pane').forEach(item => {
        item.classList.remove('active');
      });

      // 添加当前标签页和内容的活动状态
      tab.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// 初始化移动端导航菜单
function initMobileNav () {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      menuToggle.querySelector('i').classList.toggle('fa-bars');
      menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // 点击导航链接后关闭菜单
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('active');
          menuToggle.querySelector('i').classList.add('fa-bars');
          menuToggle.querySelector('i').classList.remove('fa-times');
        }
      });
    });
  }
}

// 页面滚动时缩小导航栏
function initScrollHeader () {
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.style.height = 'calc(var(--header-height) * 0.8)';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.height = 'var(--header-height)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    });
  }
}

// 平滑滚动到锚点
function initSmoothScroll () {
  const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 搜索功能实现
document.addEventListener('DOMContentLoaded', function () {
  const searchBox = document.querySelector('.search-box input');
  const searchButton = document.querySelector('.search-box button');

  // 搜索按钮点击事件
  searchButton.addEventListener('click', function () {
    performSearch();
  });

  // 输入框回车事件
  searchBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // 执行搜索
  function performSearch () {
    const searchTerm = searchBox.value.trim().toLowerCase();
    if (searchTerm.length < 2) {
      alert('请输入至少2个字符进行搜索');
      return;
    }

    // 将搜索词存储在 sessionStorage 中，以便在搜索结果页面使用
    sessionStorage.setItem('searchTerm', searchTerm);

    // 跳转到搜索结果页面
    window.location.href = 'search-results.html';
  }
});

// 检测页面可见性变化，暂停/继续轮播
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    // 页面不可见时，暂停轮播
    clearInterval(window.slideInterval);
  } else {
    // 页面可见时，继续轮播
    if (document.querySelector('.slide')) {
      window.slideInterval = setInterval(function () {
        const slides = document.querySelectorAll('.slide');
        const controls = document.querySelectorAll('.control');
        let currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
        let newIndex = (currentSlide + 1) % slides.length;

        // 使用之前定义的动画切换函数
        // 当前幻灯片向左退出
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('inactive-next');

        // 新幻灯片从右边进入
        slides[newIndex].classList.add('active-next');

        // 等待一点时间让浏览器注册这些类
        setTimeout(() => {
          slides[newIndex].classList.remove('active-next');
          slides[newIndex].classList.add('active');

          // 更新控制点
          controls.forEach((control, index) => {
            control.classList.toggle('active', index === newIndex);
          });

          // 一段时间后移除过渡类
          setTimeout(() => {
            slides.forEach(slide => {
              slide.classList.remove('inactive-next');
            });
          }, 800); // 与CSS中的过渡时间相匹配
        }, 50);

      }, 8000); // 延长到8秒
    }
  }
}); 