<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <body>
    <h2>The richest people in the world</h2>
    <table border="1">
      <thead>
        <th>Name</th>
        <th>Net Worth</th>
        <th>Age</th>
        <th>Country</th>
        <th>Source</th>
        <th>Industry</th>
      </thead>
      <xsl:for-each select="root/item">
        <tr>
          <td><xsl:value-of select="name"/></td>
          <td><xsl:value-of select="worth"/></td>
          <td><xsl:value-of select="age"/></td>
          <td><xsl:value-of select="country"/></td>
          <td><xsl:value-of select="source"/></td>
          <td><xsl:value-of select="industry"/></td>
        </tr>
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>