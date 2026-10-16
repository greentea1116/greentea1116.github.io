(() => {
  const calc = document.querySelector('[data-supply-calculator]');
  if (!calc) return;
  const update = () => {
    const target = calc.querySelector('[name="target"]');
    const current = calc.querySelector('[name="current"]');
    const item = calc.querySelector('[name="item"]');
    if (!target.validity.valid || !current.validity.valid || target.value === '' || current.value === '') {
      calc.querySelector('output').textContent = '請填入有效數量：目標 1～5000，背包數量不得小於 0。';
      return;
    }
    const need = Math.max(0, Number(target.value) - Number(current.value));
    const price = Number(item.value);
    calc.querySelector('[data-target]').textContent = target.value;
    calc.querySelector('[data-current]').textContent = current.value;
    calc.querySelector('[data-need]').textContent = need.toLocaleString('zh-TW');
    calc.querySelector('output').textContent = need ? `補買 ${need.toLocaleString('zh-TW')} 個，需準備 ${(need * price).toLocaleString('zh-TW')} 金幣。` : '數量已達目標，不會補買，也不會自動賣掉多出的物品。';
  };
  calc.addEventListener('input', update);
  update();
})();
