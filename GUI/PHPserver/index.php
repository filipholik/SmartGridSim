<!DOCTYPE html>
<html>
<head>
<title>Home</title>
<meta charset="utf-8"/>
<link rel="stylesheet" href="style.css">
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!-- AnyChart -->
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">SCADA Simulation</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="adminPanel/adminpanel.php">Quick Overview</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="topology/topology.php">Topology</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
<div id="wrap">
      <div class="card" style="width: 18rem;" id="left">
      <div class="card-body">
      <p class="card-text">Quick overview of the DSS communication.</p>
      <a href="adminPanel/adminpanel.php" class="btn btn-primary">Quick Overview</a>
    </div>
    </div>
    <div class="card" style="width: 18rem;" id="right">
      <div class="card-body">
      <p class="card-text">Active topology of the smart grid network.</p>
      <a href="topology/topology.php" class="btn btn-primary">Topology</a>
    </div>
  </div>
</div>
      



    
</body>
</html>