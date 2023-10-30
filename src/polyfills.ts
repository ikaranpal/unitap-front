import { Buffer } from 'buffer';

window.global = window.global ?? window;
window.Buffer = window.Buffer ?? Buffer;
window.process = window.process ?? { env: {} }; // Minimal process polyfill

(BigInt.prototype as any).toJSON = function () {
	return this.toString() + 'n';
};

export {};
