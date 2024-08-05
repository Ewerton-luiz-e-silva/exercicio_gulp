// Importa os módulos necessários do Gulp e plugins relacionados
const gulp = require('gulp'); // Ferramenta de automação de tarefas
const sass = require('gulp-sass')(require('sass')); // Plugin para compilar arquivos SASS para CSS
const sourcemaps = require('gulp-sourcemaps'); // Plugin para gerar mapas de origem
const uglify = require('gulp-uglify'); // Plugin para minificar arquivos JavaScript
const obfuscate = require('gulp-obfuscate'); // Plugin para ofuscar arquivos JavaScript
const imagemin = require('gulp-imagemin'); // Plugin para otimizar/comprimir imagens

// Função para comprimir imagens
function comprimeImagens() {
    return gulp.src('./source/images/*') // Fonte dos arquivos de imagem
        .pipe(imagemin()) // Aplica a compressão nas imagens
        .pipe(gulp.dest('./build/images')); // Salva as imagens comprimidas no destino
}

// Função para minificar e ofuscar arquivos JavaScript
function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js') // Fonte dos arquivos JavaScript
        .pipe(uglify()) // Minifica os arquivos JavaScript
        .pipe(obfuscate()) // Ofusca os arquivos JavaScript
        .pipe(gulp.dest('./build/scripts')); // Salva os arquivos processados no destino
}

// Função para compilar arquivos SASS para CSS
function compilaSass() {
    return gulp.src('./source/styles/main.scss') // Fonte do arquivo SASS
        .pipe(sourcemaps.init()) // Inicializa a geração de mapas de origem
        .pipe(sass({
            outputStyle: 'compressed' // Define o estilo de saída como comprimido
        }).on('error', sass.logError)) // Adiciona tratamento de erros do Sass
        .pipe(sourcemaps.write('./maps')) // Escreve os mapas de origem
        .pipe(gulp.dest('./build/styles')); // Salva o arquivo CSS compilado no destino
}

// Exporta tarefas individuais
exports.comprimeImagens = comprimeImagens;
exports.comprimeJavaScript = comprimeJavaScript;
exports.compilaSass = compilaSass;

// Tarefa padrão que observa mudanças nos arquivos e executa as funções correspondentes
exports.default = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass)); // Observa mudanças nos arquivos SASS e executa a função compilaSass
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript)); // Observa mudanças nos arquivos JavaScript e executa a função comprimeJavaScript
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens)); // Observa mudanças nos arquivos de imagem e executa a função comprimeImagens
}