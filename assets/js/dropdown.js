(function(){
  // 统一实现：点击打开/关闭下拉，按 Esc 关闭，点击外部关闭
  function enhanceDropdowns(){
    const dropdowns = Array.from(document.querySelectorAll('.nav .dropdown'));
    if(!dropdowns.length) return;

    function closeAll(){
      dropdowns.forEach(d=>{
        d.classList.remove('open');
        const trig = d.querySelector(':scope > a');
        const sub = d.querySelector('.submenu');
        if(trig) trig.setAttribute('aria-expanded','false');
        if(sub) sub.setAttribute('aria-hidden','true');
      });
    }

    dropdowns.forEach(drop=>{
      const trigger = drop.querySelector(':scope > a');
      const submenu = drop.querySelector('.submenu');
      if(!trigger || !submenu) return;

      // 初始 ARIA
      trigger.setAttribute('role','button');
      trigger.setAttribute('aria-haspopup','true');
      trigger.setAttribute('aria-expanded', String(drop.classList.contains('open')));
      submenu.setAttribute('aria-hidden', String(!drop.classList.contains('open')));

      // 点击切换（桌面与移动均适用），在桌面阻止默认跳转
      trigger.addEventListener('click', function(e){
        const isDesktop = window.innerWidth > 900;
        if(isDesktop) e.preventDefault();
        const willOpen = !drop.classList.contains('open');
        // 先关闭其他同级菜单（行为类似华为官网）
        closeAll();
        if(willOpen){
          drop.classList.add('open');
          trigger.setAttribute('aria-expanded','true');
          submenu.setAttribute('aria-hidden','false');
          // 如果桌面宽度则把 submenu 设为固定并贴合顶部（与现有脚本保持一致）
          if(isDesktop){
            const header = document.querySelector('.site-header');
            if(header){
              const rect = header.getBoundingClientRect();
              submenu.style.position = 'fixed';
              submenu.style.top = (rect.bottom) + 'px';
              submenu.style.left = '0px';
              submenu.style.width = window.innerWidth + 'px';
              submenu.style.boxSizing = 'border-box';
              submenu.style.right = '0px';
              submenu.style.margin = '0';
              submenu.style.zIndex = 99999;
            }
          }
        }else{
          drop.classList.remove('open');
          trigger.setAttribute('aria-expanded','false');
          submenu.setAttribute('aria-hidden','true');
          // 恢复样式
          submenu.style.position = '';
          submenu.style.top = '';
          submenu.style.left = '';
          submenu.style.width = '';
          submenu.style.right = '';
          submenu.style.margin = '';
          submenu.style.zIndex = '';
        }
      });

      // 键盘可访问：回车/空格触发，Esc 关闭
      trigger.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          trigger.click();
        }
        if(e.key === 'Escape'){
          drop.classList.remove('open');
          trigger.setAttribute('aria-expanded','false');
          submenu.setAttribute('aria-hidden','true');
        }
      });

      // 当 class 变化时，如果被打开则保证位置正确（配合现有调整逻辑）
      const mo = new MutationObserver(()=>{
        if(drop.classList.contains('open') && window.innerWidth>900){
          const header = document.querySelector('.site-header');
          if(header){
            const rect = header.getBoundingClientRect();
            submenu.style.position = 'fixed';
            submenu.style.top = (rect.bottom) + 'px';
            submenu.style.left = '0px';
            submenu.style.width = window.innerWidth + 'px';
            submenu.style.boxSizing = 'border-box';
            submenu.style.right = '0px';
            submenu.style.margin = '0';
            submenu.style.zIndex = 99999;
          }
        }
      });
      mo.observe(drop, { attributes:true, attributeFilter:['class'] });

    });

    // 点击外部关闭
    document.addEventListener('click', function(e){
      if(!e.target.closest('.nav')) closeAll();
    });

    // 窗口大小变化时恢复样式并关闭（避免 fixed 留下）
    window.addEventListener('resize', function(){
      dropdowns.forEach(d=>{
        const sub = d.querySelector('.submenu');
        if(sub){
          sub.style.position = '';
          sub.style.top = '';
          sub.style.left = '';
          sub.style.width = '';
          sub.style.right = '';
          sub.style.margin = '';
          sub.style.zIndex = '';
        }
      });
      // 关闭所有以免布局异常
      dropdowns.forEach(d=> d.classList.remove('open'));
    });
  }

  // DOM ready
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhanceDropdowns);
  else enhanceDropdowns();
})();
