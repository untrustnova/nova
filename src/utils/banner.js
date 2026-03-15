import pc from "picocolors";

export const printBanner = () => {
    const banner = `
    ${pc.cyan('   /\\_/\\')}
    ${pc.cyan('  ( o.o )')}  ${pc.bold(pc.white('Nova.js'))} ${pc.gray('-- SADA Framework')}
    ${pc.cyan('   > ^ <')}   ${pc.blue('Build high-performance ecosystems.')}
    `;
    console.log(banner);
    console.log(pc.gray('  ' + '-'.repeat(45)));
};
