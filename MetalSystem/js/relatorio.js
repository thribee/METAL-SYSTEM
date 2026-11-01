// Variável global para rastrear a categoria ativa atual
let categoriaAtual = "todos";

// Função para filtrar por botões de categoria
function filtrarCategoria(categoriaSelecionada, botaoClicado) {
    const botoes = document.querySelectorAll(".filtro-button .button-style");
    botoes.forEach(botao => botao.classList.remove("active"));
    
    if (botaoClicado) {
        botaoClicado.classList.add("active");
    }

    categoriaAtual = categoriaSelecionada;
    filtrarTabela();
}

// Função principal que filtra as linhas, soma o total e calcula as porcentagens
function filtrarTabela() {
    // 1. Captura os valores digitados nos inputs de data
    const dataInicioValue = document.getElementById("dataInicio").value;
    const dataFimValue = document.getElementById("dataFim").value;

    const dataInicio = dataInicioValue ? new Date(dataInicioValue) : null;
    const dataFim = dataFimValue ? new Date(dataFimValue) : null;

    // 2. Primeira passagem: Determina quais linhas estão visíveis e calcula o Total do período
    const linhas = document.querySelectorAll(".corpo-tabela tr");
    let totalFiltrado = 0;

    linhas.forEach(linha => {
        const categoriaLinha = AppGetCategoria(linha);
        const dataLinhaValue = linha.getAttribute("data-data");
        const dataLinha = new Date(dataLinhaValue);
        const valorLinha = parseFloat(linha.getAttribute("data-valor")) || 0;

        const atendeCategoria = (categoriaAtual === "todos" || categoriaAtual === categoriaLinha);
        const atendeDataInicio = (!dataInicio || dataLinha >= dataInicio);
        const atendeDataFim = (!dataFim || dataLinha <= dataFim);

        if (atendeCategoria && atendeDataInicio && atendeDataFim) {
            linha.style.display = "";
            totalFiltrado += valorLinha; // Soma o valor ao total visível
        } else {
            linha.style.display = "none";
        }
    });

    // 3. Segunda passagem: Calcula e atualiza a porcentagem de cada linha visível
    linhas.forEach(linha => {
        // Alvo: a última célula da linha (coluna de porcentagem)
        const celulaPorcentagem = linha.querySelector("td:last-child");
        
        if (linha.style.display !== "none" && totalFiltrado > 0) {
            const valorLinha = parseFloat(linha.getAttribute("data-valor")) || 0;
            // Cálculo da porcentagem individual sobre o total visível
            const porcentagem = (valorLinha / totalFiltrado) * 100;
            
            if (celulaPorcentagem) {
                celulaPorcentagem.innerText = porcentagem.toFixed(1) + "%";
            }
        } else if (celulaPorcentagem) {
            celulaPorcentagem.innerText = "0%";
        }
    });

    // 4. Atualiza o valor do "Total do período" dinamicamente no rodapé
    const elementoTotal = document.getElementById("totalPeriodoValor");
    if (elementoTotal) {
        elementoTotal.innerText = totalFiltrado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

// Função auxiliar para padronizar a leitura da categoria
function AppGetCategoria(linha) {
    return linha.getAttribute("data-categoria");
}

// Função para resetar os campos de data e voltar para "Todos"
function limparFiltros() {
    document.getElementById("dataInicio").value = "";
    document.getElementById("dataFim").value = "";
    
    const botaoTodos = document.querySelector(".filtro-button .button-style");
    filtrarCategoria('todos', botaoTodos);
}