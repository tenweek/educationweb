import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel, DialogActions,
  Grid,
  Dialog, DialogTitle, DialogContent, DialogContentText,
  Typography, TablePagination, Select, MenuItem, FormControl,
  InputLabel, Paper, TextField
} from '@material-ui/core';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
//
// import mockData from './data';
// import { StatusBullet } from 'components';
import { getClassByCond, getClassHistory, getClassList, updateClass } from '../../../../fetch/requestAPI';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
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

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, selected, history} = props;

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
              课程ID
            </Typography>
          </Grid>
          <Grid item md={10}>
            <Typography gutterBottom variant="subtitle1">
              {selected.classID}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              课程名称
            </Typography>
          </Grid>
          <Grid item >
            <Typography gutterBottom variant="subtitle1">
              {selected.className}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              教师
            </Typography>
          </Grid>
          <Grid item >
            <Typography gutterBottom variant="subtitle1">
              {selected.teacherName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <Typography gutterBottom variant="subtitle1">
              学校
            </Typography>
          </Grid>
          <Grid item >
            <Typography gutterBottom variant="subtitle1">
              {selected.school}
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

        {
          history.length > 0 ? (
            <div>
              <Typography gutterBottom variant="subtitle1">
                历史记录
              </Typography>
              <div>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>阅读量</TableCell>
                      <TableCell>交易ID</TableCell>
                      <TableCell>时间戳</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((row) => (
                      <TableRow key={row.transactionId}>

                        <TableCell>{row.readCount}</TableCell>
                        <TableCell>{row.transactionId}</TableCell>
                        <TableCell>{row.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ):(
            <Grid container>
              <Grid item md={2}>
                <Typography gutterBottom variant="subtitle1">
                  历史记录
                </Typography>
              </Grid>
              <Grid item >
                <Typography gutterBottom variant="subtitle1">
                  暂无历史记录
                </Typography>
              </Grid>
            </Grid>
          )
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          关闭
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function FormDialog(props) {
  const {open, onClose, data} = props;

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    if(value > data.readCount) {
      let res = await updateClass(data.classID, value);
      if (res === '更新成功'){
        alert('更新成功');
        onClose();
      }

    } else {
      alert('阅读量必须大于原值');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">更新阅读量</DialogTitle>
        <DialogContent>
          {/*<DialogContentText>*/}
          {/*  To subscribe to this website, please enter your email address here. We will send updates*/}
          {/*  occasionally.+ -*/}
          {/*</DialogContentText>*/}
          <TextField
            autoFocus
            margin="dense"
            id="readCount"
            label="填写阅读量"
            type="number"
            value={value}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handleSubmit} color="primary">
            提交
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const LatestOrders = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  // const [orders] = useState(mockData);
  const [datas, setDatas] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({
    classID: 'id',
    className: 'name',
    readCount: 0,
    registerTime: 'time',
    school: 'school',
    teacherName: 'teacher',
    transactionId: '',
    updateTime:  ''
  });
  const [history, setHistory] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [attr, setAttr] = React.useState('classID');
  const [input, setInput] = React.useState('');


  const handleClickOpen = async (value) => {
    setOpen(true);
    setSelected(value);
    let list = await getClassHistory(value.classID);
    setHistory(list);
    console.log(value);
    console.log(list);
  };

  const handleFormOpen = (value) => {
    setFormOpen(true);
    setSelected(value);
  }

  const handleClose = () => {
    setOpen(false);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event) => {
    setAttr(event.target.value);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    if(input.length > 0) {
      const list = await getClassByCond(attr, input);
      setDatas(list);
      setPage(0);
    }
  };

  const handleReset = async () => {
    setInput('');
    const list = await getClassList();
    // console.log(list);
    setDatas(list);
    setPage(0);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  useEffect(() => {

    const fetchData = async () => {
      const list = await getClassList();
      // console.log(list);
      setDatas(list);
      console.log(list);
    };
    fetchData();
  }, []);


  return (
    <Card>
      <CardHeader
        title={'优课列表'}
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
                <MenuItem value="classID" selected={true}>课程ID</MenuItem>
                <MenuItem value="className">课程名称</MenuItem>
                <MenuItem value="teacherName">教师</MenuItem>
                <MenuItem value="school">学校</MenuItem>
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
                  <TableCell>课程ID</TableCell>
                  <TableCell>课程名称</TableCell>
                  <TableCell>教师</TableCell>
                  <TableCell>学校</TableCell>
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
                    key={data.classID}
                    // onClick={click(data.classID)}
                  >
                    <TableCell>{data.classID}</TableCell>
                    <TableCell>{data.className}</TableCell>
                    <TableCell>{data.teacherName}</TableCell>
                    <TableCell>{data.school}</TableCell>
                    <TableCell>{data.readCount}</TableCell>
                    {/*<TableCell>{data.transactionId}</TableCell>*/}
                    {/*<TableCell>{data.registerTime}</TableCell>*/}
                    {/*<TableCell>{data.updateTime}</TableCell>*/}
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={()=>handleClickOpen(data)}>
                        详情
                      </Button>
                      <Button variant="contained" color="secondary" className={classes.button} onClick={() => handleFormOpen(data)}>
                        更新
                      </Button>
                      {/*<Button variant="contained" className={classes.button}>Default</Button>*/}

                    </TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
            <SimpleDialog  open={open} onClose={handleClose} selected={selected} history={history}/>
            <FormDialog open={formOpen} onClose={handleFormClose} data={selected}/>
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
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
