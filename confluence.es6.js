(async function() {
  const chr = org.chromium.apis.web;
  const mdn = org.mozilla.mdn;

  const rowSpecFetch = await fetch('data/confluence/class:org.mozilla.mdn.generated.ConfluenceRow.json');
  const rowSpecText = await rowSpecFetch.text();
  const confluenceRowModel = foam.json.parseString(rowSpecText);
  confluenceRowModel.validate();
  const confluenceRowCls = confluenceRowModel.buildClass();
  confluenceRowCls.validate();
  foam.register(confluenceRowCls);
  foam.package.registerClass(confluenceRowCls);

  const ConfluenceRow = confluenceRowCls;
  let confluenceDAO = foam.dao.PromisedDAO.create({
    of: ConfluenceRow,
    promise: fetch('data/confluence/org.mozilla.mdn.generated.ConfluenceRow.json')
      .then(response => response.json())
      .then(json => foam.json.parse(json, ConfluenceRow))
      .then(array => {
        const dao = foam.dao.MDAO.create({of: ConfluenceRow});
        for (const row of array) {
          dao.put(row);
        }
        return dao;
      }),
  });

  foam.CLASS({
    package: 'org.mozilla.mdn',
    name: 'ConfluenceRowFormatter',
    implements: ['foam.u2.RowFormatter'],

    methods: [
      function format(data) {
        return `<span>${data ? data.id : ''}</span>`;
      },
    ],
  });

  // TODO(markdittmer): Shouldn't these already be in release date order?
  const sortedColumns = [ConfluenceRow.ID].concat(
    ConfluenceRow.getAxiomsByClass(mdn.GridProperty)
      .filter(prop => !prop.release.isMobile)
      .sort((prop1, prop2) => prop1.release.releaseDate > prop2.release.releaseDate));
  const selectableColumns = Array.from(sortedColumns);
  const chromes = selectableColumns.filter(col => col.release && col.release.browserName === 'Chrome');
  const edges = selectableColumns.filter(col => col.release && col.release.browserName === 'Edge');
  const firefoxes = selectableColumns.filter(col => col.release && col.release.browserName === 'Firefox');
  const safaris = selectableColumns.filter(col => col.release && col.release.browserName === 'Safari');
  const selectedColumns = [
    ConfluenceRow.ID,
    chromes[chromes.length - 1],
    edges[edges.length - 1],
    firefoxes[firefoxes.length - 1],
    safaris[safaris.length - 1],
  ];
  const ctx = foam.createSubContext({
    queryParserFactory: x => mdn.parse.ConfluenceQueryParser.create({
      of: ConfluenceRow,
      interpreter: mdn.parse.ReleaseApiConfluenceQueryInterpreter
	.create(null, x),
    }, x),
  });
  mdn.DAOControllerView.create({
    selectableColumns,
    selectedColumns,
  }, mdn.DAOController.create({
    data: confluenceDAO,
  }, ctx)).write(document);
})();
