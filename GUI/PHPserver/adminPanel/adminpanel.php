<!DOCTYPE html>
<html>
    <head>
        <title>Quick Overview</title>
        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <!-- JavaScript Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
      </head>
  <body>
  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="../index.php">SCADA Simulation</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Quick Overview</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../topology/topology.php">Topology</a>
        </li>
    </div>
  </div>
</nav>

  <table class="table">
            <thead>
              <tr>
                <th scope="col">DSS</th>
                <th scope="col">State</th>
                <th scope="col">Timestamp</th>
                <th scope="col">RCVD ASDU type</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-danger" id="0">
                <th scope="row">1</th>
                <td id="state1"></td>
                <td id="ts1"></td>
                <td id="asdu1"></td>
              </tr>
              <tr class="table-danger" id="1">
                <th scope="row">2</th>
                <td id="state2"></td>
                <td id="ts2"></td>
                <td id="asdu2"></td>
              </tr>
            </tbody>
          </table>
    </body>
    <script src="client.js"></script>
</html>