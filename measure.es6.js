setTimeout(() => {
  const rows = document.querySelectorAll('li.Row');
  console.log('Rows', rows);
  const row = rows[rows.length - 1];
  const scroller = row.parentElement;
  console.log('Row', row);

  let times = [];
  let scrollTops = [];
  let timing = false;
  const raf = () => {
    times.push(performance.now());
    scrollTops.push(scroller.scrollTop);
    if (timing) requestAnimationFrame(raf);
  };

  timing = true;
  const startTime = performance.now();
  row.scrollIntoView();
  requestAnimationFrame(raf);
  setTimeout(() => {
    timing = false;
    const endTime = performance.now();
    let diffs = [];
    let frs = [];
    for (let i = 1; i < times.length; i++) {
      const diff = times[i] - times[i - 1];
      diffs.push(diff);
      frs.push(1000 / diff);
    }
    console.log('Frame times (ms)', diffs);
    console.log('Frame rates (fps)', frs);
    console.log('Scroll tops', scrollTops);

    window.location.search.indexOf('showReport') !== -1 && (function() {
      const scrollTopMax = Math.max.apply(Math, scrollTops);
      const fpsColor = fr => fr < 20 ? 'red' : fr < 50 ? 'yellow' : 'green';
      const scrollTopColor = scrollTop => `rgb(0, ${Math.round(255 * scrollTop / scrollTopMax)}, 255)`;
      let report = `
Scroll top: ${scrollTopMax}
<table><thead><tr><th>Raw time</th><th>Time (ms)</th><th>FPS</th><th>Scroll top</th></thead><tbody>
`;
      for (let i = 0; i< times.length; i++) {
	const time = times[i].toPrecision(4);
	const diff = (diffs[i] || 0).toPrecision(4);
	const fr = (frs[i] || 0).toPrecision(4);
	const scrollTop = scrollTops[i] || 0;
	report += `<tr>
  <td>${time}</td>
  <td>${diff}</td>
  <td style="background-color: ${fpsColor(fr)}">${fr}</td>
  <td style="background-color: ${scrollTopColor(scrollTop)}">${scrollTop}</td>
</tr>
`;
	if (scrollTop === scrollTopMax) break;
      }
      report += `</tbody></table>`;

      document.body.style.overflow = 'auto';
      document.body.innerHTML = report;
    })();
  }, 10000);
}, 10000);
