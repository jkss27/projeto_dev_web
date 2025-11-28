(function(){
  const lista = document.getElementById('lista_doacoes');
  const vazio = document.getElementById('sem_doacoes');
  const dadosMock = [];
  function render(){
    if(!dadosMock.length){ if(vazio) vazio.style.display='block'; return; }
    if(vazio) vazio.style.display='none';
    dadosMock.forEach(d => {
      if(!lista) return;
      const card = document.createElement('div');
      card.style.padding='1rem';
      card.style.border='1px solid #e2d9f3';
      card.style.borderRadius='8px';
      card.style.background='#f9f6ff';
      card.innerHTML = '<strong>'+ d.tipo +'</strong><br><span style="font-size:.8rem; color:#555;">'+ d.data +'</span>';
      lista.appendChild(card);
    });
  }
  render();
})();
