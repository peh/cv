import gulp from 'gulp'
import ghPages from 'gulp-gh-pages'
import clean from 'gulp-clean'
import {
	exec
}
from 'child_process'

const GH_PAGES_OPTIONS = {
	push: false
}

const OUT_DIR = "out"

gulp.task('build-html', (cb) => {

	exec(`rm -R ${OUT_DIR} && mkdir ${OUT_DIR} && resume export -t slick ${OUT_DIR}/index.html`, (err, stdout, stderr) => {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
})

gulp.task('deploy', ['build-html'], () => {
	exec("resume export -t slick out/index.html")
	return gulp.src('./out/**/*')
		.pipe(ghPages(GH_PAGES_OPTIONS))
})