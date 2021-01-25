import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  Grid,
  Typography,
  Card,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button, CardHeader, Divider, CardContent, Table, TableHead, TableRow, TableCell, TableBody, TablePagination,
  Link, Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import mockData from './data';
import { getResourceList, getResourceByCond } from '../../fetch/requestAPI';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    marginLeft: theme.spacing(1),
  }

}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, selected} = props;

  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={'md'}
      scroll={'paper'}
    >
      <DialogTitle id="simple-dialog-title">详情</DialogTitle>
      <DialogContent>
        <Grid container >
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              资源ID
            </Typography>
          </Grid>
          <Grid item md={10}>
            <Typography gutterBottom variant="subtitle1">
              {selected.resourceID}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              课程ID
            </Typography>
          </Grid>
          <Grid item >
            <Typography gutterBottom variant="subtitle1">
              {selected.classID}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              资源名
            </Typography>
          </Grid>
          <Grid item >
            <Typography gutterBottom variant="subtitle1">
              {selected.resourceName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              链接
            </Typography>
          </Grid>
          <Grid item md={10}>
            <Typography gutterBottom variant="subtitle1">
              {selected.link}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              阅读量
            </Typography>
          </Grid>
          <Grid item >
            <Typography gutterBottom variant="subtitle1">
              {selected.readCount}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              下载量
            </Typography>
          </Grid>
          <Grid item >
            <Typography gutterBottom variant="subtitle1">
              {selected.download}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              上链交易ID
            </Typography>
          </Grid>
          <Grid item >
            <Typography gutterBottom variant="subtitle1">
              {selected.transactionId}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              上链时间戳
            </Typography>
          </Grid>
          <Grid item >
            <Typography gutterBottom variant="subtitle1">
              {selected.registerTime}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              最近更新时间
            </Typography>
          </Grid>
          <Grid item >
            <Typography gutterBottom variant="subtitle1">
              {selected.updateTime}
            </Typography>
          </Grid>
        </Grid>

        {/*{*/}
        {/*  history.length > 0 ? (*/}
        {/*    <div>*/}
        {/*      <Typography gutterBottom variant="subtitle1">*/}
        {/*        历史记录*/}
        {/*      </Typography>*/}
        {/*      <div>*/}
        {/*        <Table className={classes.table} aria-label="simple table">*/}
        {/*          <TableHead>*/}
        {/*            <TableRow>*/}
        {/*              <TableCell>阅读量</TableCell>*/}
        {/*              <TableCell>交易ID</TableCell>*/}
        {/*              <TableCell>时间戳</TableCell>*/}
        {/*            </TableRow>*/}
        {/*          </TableHead>*/}
        {/*          <TableBody>*/}
        {/*            {history.map((row) => (*/}
        {/*              <TableRow key={row.transactionId}>*/}

        {/*                <TableCell>{row.readCount}</TableCell>*/}
        {/*                <TableCell>{row.transactionId}</TableCell>*/}
        {/*                <TableCell>{row.timestamp}</TableCell>*/}
        {/*              </TableRow>*/}
        {/*            ))}*/}
        {/*          </TableBody>*/}
        {/*        </Table>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  ):(*/}
        {/*    <Grid container>*/}
        {/*      <Grid item md={2}>*/}
        {/*        <Typography gutterBottom variant="subtitle1">*/}
        {/*          历史记录*/}
        {/*        </Typography>*/}
        {/*      </Grid>*/}
        {/*      <Grid item >*/}
        {/*        <Typography gutterBottom variant="subtitle1">*/}
        {/*          暂无历史记录*/}
        {/*        </Typography>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  )*/}
        {/*}*/}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          关闭
        </Button>
      </DialogActions>
    </Dialog>
  );
}


const ProductList = () => {
  const classes = useStyles();

  const [datas, setDatas] = React.useState([]);
  const [attr, setAttr] = React.useState('resourceID');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState({
    resourceID: 'id',
    classID: 'class',
    resourceName: 'name',
    link: '',
    download: 0,
    readCount: 0,
    registerTime: 'time',
    transactionId: '',
    updateTime:  ''
  });
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const handleClickOpen = (value) => {
    setOpen(true);
    setSelected(value);
    // let list = await getClassHistory(value.classID);
    // setHistory(list);
    console.log(value);
    // console.log(list);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAttr(event.target.value);

  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = async () => {
    if(input.length > 0) {
      const list = await getResourceByCond(attr, input);
      setDatas(list);
      setPage(0);
    }
  };

  const handleReset = async () => {
    setInput('');
    const list = await getResourceList();
    // console.log(list);
    setDatas(list);
    setPage(0);
  };

  useEffect(() => {

    const fetchData = async () => {
      const list = await getResourceList();
      // console.log(list);
      setDatas(list);
      console.log(list);
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          title={'资源列表'}
          action={
            <Grid container alignItems="center">
              <FormControl variant="outlined" className={classes.formControl}>
                {/*<InputLabel id="demo-simple-select-outlined-label">查询</InputLabel>*/}
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={attr}
                  onChange={handleChange}
                  label=""
                >
                  <MenuItem value="resourceID" >资源ID</MenuItem>
                  <MenuItem value="classID">课程ID</MenuItem>
                  <MenuItem value="resourceName">资源名</MenuItem>
                </Select>

              </FormControl>
              <TextField id="outlined-basic" value={input} placeholder={'请输入搜索条件'} onChange={handleInputChange}/>
              <Button variant="outlined" color="primary" className={classes.button} onClick={() => {handleSearch()}}>
                搜索
              </Button>
              <Button variant="outlined" onClick={() => {handleReset()}} className={classes.button}>重置</Button>
            </Grid>
          }
        />

      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>资源ID</TableCell>
                  <TableCell>课程ID</TableCell>
                  <TableCell>资源名称</TableCell>
                  <TableCell>链接</TableCell>
                  <TableCell>下载量</TableCell>
                  <TableCell>阅读量</TableCell>
                  <TableCell>操作</TableCell>
                  {/*<TableCell>上链交易</TableCell>*/}
                  {/*<TableCell>上链时间</TableCell>*/}
                  {/*<TableCell>最近更新时间</TableCell>*/}
                </TableRow>
              </TableHead>
              <TableBody >
                { datas && datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(data => (
                  <TableRow
                    hover
                    key={data.resourceID}
                    // onClick={click(data.classID)}
                  >
                    <TableCell>{data.resourceID}</TableCell>
                    <TableCell>{data.classID}</TableCell>
                    <TableCell>{data.resourceName}</TableCell>
                    <TableCell>
                      <Link href={data.link} >
                        链接
                      </Link>
                    </TableCell>
                    <TableCell>{data.download}</TableCell>
                    <TableCell>{data.readCount}</TableCell>
                    {/*<TableCell>{data.transactionId}</TableCell>*/}
                    {/*<TableCell>{data.registerTime}</TableCell>*/}
                    {/*<TableCell>{data.updateTime}</TableCell>*/}
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleClickOpen(data)}>
                        详情
                      </Button>
                      <Button variant="contained" color="secondary" className={classes.button} >
                        更新
                      </Button>
                      {/*<Button variant="contained" className={classes.button}>Default</Button>*/}

                    </TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
            <SimpleDialog  open={open} onClose={handleClose} selected={selected} />
            {/*<FormDialog open={formOpen} onClose={handleFormClose} data={selected}/>*/}
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={datas.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      </Card>
    </div>
  );
};

export default ProductList;
