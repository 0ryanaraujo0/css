// Scripts de dashboard e login
document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todos os links do menu
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    link.addEventListener('click', function () {
      // Remove a classe 'active' do item que estava selecionado antes
      document.querySelector('.nav-link.active')?.classList.remove('active');

      // Adiciona a classe 'active' apenas no item que acabou de ser clicado
      this.classList.add('active');
    });
  });

  // Lógica de login/redirecionamento — ativa apenas quando existem os campos `usuario` e `senha`
  var usuario = document.getElementById('usuario');
  var senha = document.getElementById('senha');
  if (usuario && senha) {
    var loginForm = usuario.closest('form') || document.querySelector('form');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var u = usuario.value.trim();
        var p = senha.value;

        if (u === 'gerente' && p === 'gerente123') {
          window.location.href = 'GERENTE/dashbord.html';
          return;
        }

        if (u === 'inspetor' && p === 'inspetor123') {
          window.location.href = 'INSPETOR/registroErro-inspetor.html';
          return;
        }

        if (u === 'lider' && p === 'lider123') {
          window.location.href = 'LIDER/dashbord-lider.html';
          return;
        }

        alert('Usuário ou senha incorretos.');
      });
    }
  }

  // Lógica para páginas de registro de erro: gravidade, submissão e adicionar em "Adicionados Agora"
  var registroContainer = document.querySelector('.registro-container');
  if (registroContainer) {
    // Gravidade: alterna classe active entre botões
    var gravBtns = registroContainer.querySelectorAll('.gravidade-btn');
    gravBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        gravBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Formulário de registro
    var regForm = registroContainer.querySelector('form');
    var recentArea = registroContainer.querySelector('.side-card');
    var sideText = recentArea.querySelector('.side-text');

    function getCurrentTimeHM() {
      var d = new Date();
      var hh = String(d.getHours()).padStart(2,'0');
      var mm = String(d.getMinutes()).padStart(2,'0');
      return hh + ':' + mm;
    }

    if (regForm && recentArea) {
      regForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var colaborador = regForm.querySelector('#colaborador')?.value || 'Usuário';
        var tipoErro = regForm.querySelector('#tipoErro')?.value || 'Erro';

        // Cria o item recente
        var item = document.createElement('div');
        item.className = 'recent-item';

        var left = document.createElement('div');

        var h4 = document.createElement('h4');
        h4.textContent = tipoErro;

        var userDiv = document.createElement('div');
        userDiv.className = 'recent-user';
        userDiv.innerHTML = '<span class="dot"></span>' + colaborador;

        left.appendChild(h4);
        left.appendChild(userDiv);

        var timeSpan = document.createElement('span');
        timeSpan.className = 'recent-time';
        timeSpan.textContent = getCurrentTimeHM();

        item.appendChild(left);
        item.appendChild(timeSpan);

        // Insere no topo dos itens recentes (antes do primeiro .recent-item se existir)
        var firstRecent = recentArea.querySelector('.recent-item');
        if (firstRecent) recentArea.insertBefore(item, firstRecent);
        else recentArea.insertBefore(item, sideText);

        // Limitar a quantidade de itens recentes a 5 (remove o mais antigo)
        var recentItems = recentArea.querySelectorAll('.recent-item');
        if (recentItems.length > 5) {
          var last = recentItems[recentItems.length - 1];
          recentArea.removeChild(last);
        }

        // Limpar campos específicos (mantém colaborador e data conforme instrução)
        regForm.querySelector('#tipoErro').value = '';
        regForm.querySelector('#descricao').value = '';
      });
    }
  }
});

    //-------------------------------------------------------------------------------