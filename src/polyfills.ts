import * as process from "process";
(window as any).global = window;
window.process = process;
import { Buffer } from 'buffer';
window.Buffer = Buffer;

