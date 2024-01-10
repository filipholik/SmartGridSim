<!DOCTYPE html>
<html>
<head>
<title>Topology</title>
<meta charset="utf-8"/>
<link rel="stylesheet" href="style.css">
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!-- AnyChart -->

<script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-core.min.js"></script>
<script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-graph.min.js"></script>
<script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-data-adapter.min.js"></script>
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
                <a class="nav-link active" aria-current="page" href="../adminPanel/adminpanel.php">Quick Overview</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Topology</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <?php
      if ($_GET['run']) {
        # This code will run if ?run=true is set.
        exec("cd /home/intsec/InterSecureModel/; xterm -e sudo ./StartSGTopology.sh");
      }
      if ($_GET['disconnectDSS1']){
        exec("sudo ./disconnect_DSS1.sh");
      }
      if ($_GET['disconnectDSS2']){
        exec("sudo ./disconnect_DSS2.sh");
      }
      if ($_GET['connectDSS1']){
        exec("sudo ./connect_DSS1.sh");
      }
      if ($_GET['connectDSS2']){
        exec("sudo ./connect_DSS2.sh");
      }
      ?>
    <div id="container">
    </div>
    <div id="card_container">
      <div class="card col-1" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">DSS1 Control</h5>
          <p class="card-text">Connection control to the secondary substation 1. </p>
          <a href="?connectDSS1=true" class="btn btn-primary" id="btn-connect-1">Connect</a>
          <a href="?disconnectDSS1=true" class="btn btn-primary" id="btn-disconnect-1">Disconnect</a>
        </div>
      </div>
      <div class="card col-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">DSS2 Control</h5>
          <p class="card-text">Connection control to the secondary substation 2.</p>
          <a href="?connectDSS2=true" class="btn btn-primary" id="btn-connect-2" disabled>Connect</a>
          <a href="?disconnectDSS2=true" class="btn btn-primary" id="btn-disconnect-2">Disconnect</a>
        </div>
      </div>
    </div>
    <script src="topology.js"></script>
    
</body>
</html>