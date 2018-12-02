'use strict';

var fs = require('fs');
var archiver = require('archiver');
var zlib = require('zlib');
var path = require('path')

class PackagePlugin {
    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;
        this.hooks = {
            'before:deploy:deploy': this.package.bind(this)
        };
    }
    package() {
        this.serverless.cli.log('Repackaging files...');
        var service = this.serverless.service;
        var artifact = service.package.artifact;
        var packages = service.package.include;
        var servicePath = this.serverless.config.servicePath;
        fs.unlinkSync(artifact);
        var output = fs.createWriteStream(artifact);
        var archive = archiver('zip', { store: true, zlib: { flush: zlib.Z_FULL_FLUSH, level: 9 } });
        packages.forEach(p => {
            archive.glob("**", {
                cwd: path.join(servicePath, p.replace(/\*/g, "")),
                absolute: false,
                nounique: false
            })
        });
        archive.on('error', function (err) {
            throw err;
        });
        archive.pipe(output);
        archive.finalize();
        return new Promise((resolve, reject) => {
            output.on('close', () => {
                resolve(artifact)
            });
            output.on('error', (err) => reject(err));
        });
    }
}

module.exports = PackagePlugin;
