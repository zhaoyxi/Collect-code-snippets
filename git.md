# GIT

```code
git branch 列出本地已经存在的分支，并且当前分支会用*标记
git branch -r 查看远程版本库的分支列表
git branch -a 查看所有分支列表（包括本地和远程，remotes/开头的表示远程分支）
git branch -v 查看一个分支的最后一次提交
git branch --merged  查看哪些分支已经合并到当前分支
git branch --no-merged 查看所有未合并工作的分支
```

删除本地已合并的分支：

```copy
git branch --merged master | grep -v master | xargs git branch -d
```

删除远程已合并的分支：

```copy
git branch -r --merged master | sed 's/origin\//:/' | xargs -n 1 git push origin
```

这两个命令都是以主分支为基准，删除已经合并到主分支的分支。如果想要删除所有分支（包括未合并的分支），可以将--merged参数改成-a。需要注意的是，这样会删除所有分支，包括未合并的分支，可能会造成数据丢失，请谨慎操作。
